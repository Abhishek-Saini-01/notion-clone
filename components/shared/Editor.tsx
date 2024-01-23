"use client"

interface EditorProps {
      onChange: (value: string) => void;
      initialContent?: string;
      editable?: boolean;
    };

import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";


function Editor({
    onChange,
    editable,
    initialContent
}:EditorProps) {
    const { resolvedTheme } = useTheme();
    const {edgestore}  = useEdgeStore();
  
    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file,
        })

        return response.url;        
    }

  const editor: BlockNoteEditor = useBlockNote({
    editable, //@ts-ignore
    initialContent:  initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload
  });

  
  return <BlockNoteView editor={editor} theme={resolvedTheme === "dark" ? "dark" : "light"} />;
}

export default Editor;