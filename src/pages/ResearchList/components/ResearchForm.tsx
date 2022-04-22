import {
  ProFormDigit,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { useAccess } from 'umi';

export const ResearchForm = ({ initial }: any) => {
  const { canAdmin } = useAccess();
  return (
    <>
      <ProFormGroup>
        <ProFormText
          width="sm"
          name="researchName"
          key="researchName"
          label="科研名称"
          rules={[{ required: true, message: '请填写科研名称!' }]}
        />
        <ProFormSelect
          width="sm"
          name="field"
          key="field"
          label="科研领域"
          options={[
            { label: '智能制造', value: 0 },
            { label: '人工智能', value: 1 },
            { label: '数字化与互联网', value: 2 },
            { label: '生命健康与医疗', value: 3 },
            { label: '节能环保与新材料', value: 4 },
          ]}
          rules={[{ required: true, message: '请选择科研领域!' }]}
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormSelect
          width="sm"
          name="category"
          key="category"
          label="项目类别"
          options={[
            { label: '国际合作项目', value: 0 },
            { label: '校企合作项目', value: 1 },
            { label: '国家科学基金', value: 2 },
            { label: '科技学术竞赛', value: 3 },
          ]}
          rules={[{ required: true, message: '请选择项目类别!' }]}
        />
        <ProFormDigit
          width="sm"
          name="cost"
          key="cost"
          label="预申请经费"
          min={2000}
          max={100000}
          rules={[{ required: true, message: '请输入预申请经费!' }]}
          fieldProps={{ precision: 0, prefix: '￥' }}
        />
      </ProFormGroup>
      <ProFormUploadButton
        max={2}
        label={initial ? '文件重新上传' : '文件上传'}
        name="file"
        fieldProps={{
          accept: '.pdf, .doc, .docx, .xls, .xlsx',
        }}
      />

      <ProFormTextArea width={465} name="description" key="description" label="详细描述" />

      {canAdmin && (
        <ProFormGroup>
          <ProFormSelect
            width="sm"
            name="review"
            key="review"
            label="审核情况"
            options={[
              { label: '审核中', value: 0 },
              { label: '已通过', value: 1 },
              { label: '未通过', value: 2 },
            ]}
          />
          <ProFormText width="sm" name="reviewer" key="reviewer" label="审核人" disabled />
        </ProFormGroup>
      )}
    </>
  );
};
