// Simple VirtualHost Grammar
// ==========================

Start = blocks:Block* {
	return blocks.filter(function(block) {
    	return block.type === 'scope' || block.type === 'directive';
    });
}

Block = EmptyLine / Comment / Scope / Directive

Scope = name:ScopeName area:ScopeArea body:ScopeBody* ScopeEnd {
	return { type : 'scope', name : name, area : area, body : body }
}
ScopeName = Multispaces '<' name:[a-z/]i+ ' ' { return name.join('') }
ScopeArea = area:TScopeArea* '>' EmptyLine { return area.join('')}
ScopeBody = Block
ScopeEnd = Multispaces '</' TDirectiveName* '>' EmptyLine*

Directive = Multispaces directiveName:DirectiveName Multispaces directiveParameters:DirectiveParams EmptyLine {
    return { type : 'directive', name : directiveName, parameters : directiveParameters }
}

DirectiveName = directiveName:TDirectiveName+ {	return directiveName.join('') }
DirectiveParams = directiveParams:(DirectiveParameter Multispaces)* {
	var params = []
    for(var i in directiveParams) {
    	params.push(directiveParams[i][0])
    }
    return params
}

DirectiveParameter 'Directive Parameter' = directiveParameter:TDirectiveParameter+ {
    return {
    	value : directiveParameter.join(''),
        location : location()
    }
}

TScopeArea = $(!['>'] .)
TDirectiveName = [a-z]i
TDirectiveParameter = $(![' \n'] .)
Comment = Multispaces '#' AnyChar* NewLine { return { type : 'comment' } }
AnyChar = !NewLine .
Multispaces 'Multispaces' = [ \t]*
NewLine 'NewLine' = [\n\r] { return { type : 'blank_line' } }
EmptyLine 'EmptyLine' = Multispaces NewLine { return { type : 'empty_line' } }