import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './style.scss'

export default function Editor({ handleChange, ...props }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      onReady={(editor) => {}}
      onBlur={(event, editor) => {}}
      onFocus={(event, editor) => {}}
      onChange={(event, editor) => {
        handleChange(editor.getData())
      }}
      {...props}
    />
  )
}
