import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';
//izbocene linije su za datum i u fazi razvoja su
class TextEditor extends Component {
    state = {
        data: null,
        date: null
    }

    onChangeInEditor = (event, editor) => {
        this.setState({date: moment().format('lll')})
        const data = editor.getData().replace('<p>','').replace('</p>', '').replace('null', '')
        this.setState({data: data.concat(" - ", this.state.date)})
        localStorage.setItem('Data-post', this.state.data)
        sessionStorage.setItem('Data-a', this.state.data)
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