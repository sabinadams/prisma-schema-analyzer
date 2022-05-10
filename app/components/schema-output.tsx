import { chromeDark, ObjectInspector } from "react-inspector"

interface props {
    dmmf: string
}

export const SchemaOutput = ({ dmmf }: props) => {
    return <ObjectInspector
        data={dmmf}
        theme={{
            ...chromeDark,
            BASE_BACKGROUND_COLOR: '#1E293B',
            BASE_FONT_SIZE: '24px',
            TREENODE_FONT_SIZE: '1rem'
        }}
    />
}