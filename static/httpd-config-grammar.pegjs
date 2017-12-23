// Simple VirtualHost Grammar
// ==========================
{
	const DIRECTIVE_TYPE = {
    	ROOT: 'ROOT',
    	SCOPED: 'SCOPED',
        PLAIN: 'PLAIN',
        BLANK_LINE: 'BLANK_LINE',
        COMMENT: 'COMMENT',
        NEW_LINE: 'NEW_LINE'
    }
}

Start = blocks:Block* {
	return {
    	type: DIRECTIVE_TYPE.ROOT,
        body: blocks.filter(function(block) {
            return block.type === DIRECTIVE_TYPE.SCOPED || block.type === DIRECTIVE_TYPE.PLAIN;
        })
    }
}

Block = EmptyLine / Comment / Scope / Directive

Scope = name:ScopeName area:ScopeArea body:ScopeBody* ScopeEnd {
	return {
    	type : DIRECTIVE_TYPE.SCOPED,
        name : name,
        parameters : [
        	{
            	value : area,
                location : location()
            }
        ],
        body : body,
        location : location()
    }
}
ScopeName = Multispaces '<' name:[a-z/]i+ ' ' { return name.join('') }
ScopeArea = area:TScopeArea* '>' EmptyLine { return area.join('')}
ScopeBody = Block
ScopeEnd = Multispaces '</' TDirectiveName* '>' EmptyLine*

Directive = Multispaces directiveName:DirectiveName Multispaces directiveParameters:DirectiveParams EmptyLine {
    return { type : DIRECTIVE_TYPE.PLAIN, name : directiveName, parameters : directiveParameters, location : location() }
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
Comment = Multispaces '#' AnyChar* NewLine { return { type : DIRECTIVE_TYPE.COMMENT } }
AnyChar = !NewLine .
Multispaces 'Multispaces' = [ \t]*
NewLine 'NewLine' = [\n\r] { return { type : DIRECTIVE_TYPE.NEW_LINE } }
EmptyLine 'EmptyLine' = Multispaces NewLine { return { type : DIRECTIVE_TYPE.BLANK_LINE } }