import { Editor } from '@tinymce/tinymce-react';

export const DocEditor = (props) => {
  const { value, onChange } = props;
  return (
    <div style={{ width: 800 }}>
      <Editor
        apiKey="dfyrqzcyrmgg622hu1uifsljqk48d7l69abbjooym8bna392"
        value={value}
        onEditorChange={onChange}
        init={{
          language: 'zh_CN',
          // min_height: 500,
          min_width: 1200,
          height: 600,

          toolbar_mode: 'wrap',
          // body_class: 'tinymce-content',
          quickbars_image_toolbar: 'alignleft aligncenter alignright | imageoptions',
          block_formats:
            'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4; Header 5=h5; Header 6=h6',
          fontsize_formats: '8px 10px 14px 16px 18px 20px 22px 24px 26px 28px 32px 48px',
          font_formats: '宋体;仿宋;微软雅黑;黑体;仿宋_GB2312;楷体;隶书;幼圆',
          toolbar:
            'formatselect |  \
                 bold italic underline strikethrough forecolor backcolor removeformat | \
                 bullist numlist | \
                 outdent indent | \
                 image table | \
                 alignleft aligncenter alignright alignjustify | \
                 link charmap | \
                 undo redo preview',
        }}
      />
    </div>
  );
};
