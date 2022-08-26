import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import type { Client } from 'types/Client';
import type { RootState } from 'app/store';
import {
  setSelectedClient,
  setSelectedBuilding,
} from 'features/Clients/clientsSlice';

import './ClientsDropdown.css';

const { Option } = Select;

export default function ClientsDropdown() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clients = useAppSelector((state: RootState) => state.clients.clients);

  const initClient = (id: number) => {
    const client = clients.find((client: Client) => client.id === id);

    dispatch(setSelectedClient(client));

    dispatch(setSelectedBuilding(client!.buildings[0]));
  };

  const onChange = (value: string) => {
    initClient(Number(value));
    navigate(`/client/${value}`);
  };

  return (
    <div className="clients-dropdown">
      <h1>Clients</h1>
      <Select
        showSearch
        placeholder="Select a User"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input: string, option: any) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {clients.map(({ name, id }) => (
          <Option key={id} value={id}>
            {name}
          </Option>
        ))}
      </Select>
    </div>
  );
}
