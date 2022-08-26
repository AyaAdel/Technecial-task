import { useEffect } from 'react';
import { Button, Select, Form, Input } from 'antd';
import countriesList from 'mocking/countriesList.json';
import { useAppDispatch } from 'app/hooks';
import { useParams } from 'react-router-dom';
import {
  addBuildingToClient,
  editBuildingInfo,
} from 'features/Clients/clientsSlice';
import type { Building } from 'types/Client';

import './AddNewBuilding.css';

type AddNewBuildingProps = {
  setDisplayEditAndNew: (show: boolean) => void;
  editInfo: { buildingInfo: Building; clientId: string | undefined };
  isNew: boolean;
};

const { Option } = Select;

export default function AddNewBuilding({
  setDisplayEditAndNew,
  editInfo,
  isNew,
}: AddNewBuildingProps) {
  const dispatch = useAppDispatch();
  const { clientId } = useParams();
  const [form] = Form.useForm();

  const viewMap = () => setDisplayEditAndNew(false);

  const onFinish = (values: any) => {
    const selectedCountry = countriesList.find(
      (country) => country.id === values.country
    );

    const buildingInfo = {
      ...selectedCountry,
      name: values.buildingName,
      country: selectedCountry?.name,
    };

    isNew
      ? dispatch(addBuildingToClient({ buildingInfo, clientId }))
      : dispatch(
          editBuildingInfo({
            buildingInfo,
            clientId,
            currentBuildingId: editInfo.buildingInfo.id,
          })
        );

    setDisplayEditAndNew(false);
  };

  useEffect(() => {
    if (isNew) {
      form.resetFields();
      return;
    }
    form.setFieldsValue({
      buildingName: editInfo?.buildingInfo.name,
      country: editInfo?.buildingInfo.id,
    });
  }, [editInfo, form, isNew]);

  return (
    <div className="add-new-building">
      <div className="header">Add / Edit Building</div>
      <Form
        form={form}
        name="basic"
        autoComplete="off"
        layout="vertical"
        className="add-edit-form"
        onFinish={onFinish}
      >
        <Form.Item required label="Building Name" name="buildingName">
          <Input />
        </Form.Item>

        <Form.Item label="Country" name="country" required>
          <Select showSearch placeholder="Select a Country">
            {countriesList.map(({ name, id }) => (
              <Option key={id} value={id}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button className="cancel-btn" htmlType="button" onClick={viewMap}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
