import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class TextEditor extends Component {
    state = {
        data: null
    }

    onChangeInEditor = (event, editor) => {
        const data = editor.getData()
        this.setState({data: data})
        localStorage.setItem('Data-post',this.state.data)
    }

    render() {
        return (
            <div className="TextEditor">
                <h2>Your Notes</h2>
                <CKEditor
                    editor={ ClassicEditor }
                    data="" //default text
                    // onReady={ editor => {
                    //     //You can store the "editor" and use when it is needed.
                    //     console.log( 'Editor is ready to use!', editor );
                    // } }
                    onChange={ ( event, editor ) => this.onChangeInEditor(event, editor) }
                    // onBlur={ (/*  event, */ editor ) => {
                    //     console.log( 'Blur.', editor );
                    // } }
                    // onFocus={ ( event, editor ) => {
                    //     console.log( 'Focus.', editor );
                    // } }
                />
            </div>
        );
    }
}

export default TextEditor;