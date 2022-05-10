import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
require('prismjs/components/prism-graphql')

interface props {
    fetcher: any
}

export const SchemaForm = ({ fetcher }: props) => {
    const textarea = useRef<HTMLTextAreaElement>(null)
    const pre = useRef<HTMLPreElement>(null)
    const [unformatted, setUnformatted] = useState(``)

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
        let value = unformatted,
            selStartPos = evt.currentTarget.selectionStart;

        // handle 4-space indent on
        if (evt.key === "Tab") {
            value =
                value.substring(0, selStartPos) +
                "    " +
                value.substring(selStartPos, value.length);
            evt.currentTarget.selectionStart = selStartPos + 3;
            evt.currentTarget.selectionEnd = selStartPos + 4;
            evt.preventDefault();
            setUnformatted(value);
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement | HTMLPreElement, UIEvent>, ref: React.RefObject<HTMLTextAreaElement | HTMLPreElement>) => {
        if (ref && ref.current) {
            ref.current.scrollTop = e.currentTarget.scrollTop
            ref.current.scrollLeft = e.currentTarget.scrollLeft
            if (
                !(Number(ref.current.clientHeight)
                    > Number(e.currentTarget.clientHeight))
            ) {
                ref.current.style.width = `${Number(e.currentTarget.clientHeight)}px`
            }
            if (
                !(Number(ref.current.style.height.replace('px', ''))
                    > Number(e.currentTarget.style.height.replace('px', '')))
            ) {
                ref.current.style.height = `${e.currentTarget.style.height}px`
            }
        }
    }

    useEffect(() => {
        Prism.highlightAll();
    }, [unformatted]);

    return (
        <fetcher.Form id="schema-form" method="post" action="/dmmf" className='h-full overflow-scroll code-edit-container'>
            <input type="hidden" name="schema" defaultValue={unformatted} />
            <textarea
                ref={textarea}
                name="schema-display"
                className="code-input overflow-scroll p-2 focus:outline-none whitespace-nowrap placeholder-teal-300 caret-teal-300"
                placeholder="Paste schema here..."
                onChange={(evt) => setUnformatted(evt.target.value)}
                onKeyDown={handleKeyDown}
                value={unformatted}
                onScroll={e => handleScroll(e, pre)}
            />
            <pre ref={pre} className="code-output whitespace-nowrap overflow-scroll" onScroll={e => handleScroll(e, textarea)}>
                <code className={`language-graphql whitespace-nowrap overflow-scroll`}>{unformatted + '\n'}</code>
            </pre>
        </fetcher.Form>
    )
}