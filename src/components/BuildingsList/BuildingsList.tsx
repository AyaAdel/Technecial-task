import { useEffect, useState } from 'react';
import { Button, List } from 'antd';
import { HomeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import type { Building } from 'types/Client';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import type { RootState } from 'app/store';
import {
  setSelectedBuilding,
  deleteBuilding,
} from 'features/Clients/clientsSlice';

import './BuildingsList.css';

type BuildingsListProps = {
  setIsNew: (show: boolean) => void;
  setDisplayEditAndNew: (show: boolean) => void;
  editBuilding: (building: Building, clientId: string | undefined) => void;
};

export default function BuildingsList({
  setIsNew,
  editBuilding,
  setDisplayEditAndNew,
}: BuildingsListProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { clientId } = useParams();

  const [buildings, setBuildings] = useState<Building[] | undefined>(
    [] as Building[]
  );

  const client = useAppSelector(
    (state: RootState) => state.clients.selectedClient
  );

  const selectedBuilding = useAppSelector(
    (state: RootState) => state.clients.selectedBuilding
  );

  const changeSelectedBuilding = (building: Building) => {
    dispatch(setSelectedBuilding(building));

    navigate(`/client/${clientId}/${building.id}`);
  };

  useEffect(() => {
    setBuildings(client?.buildings);
  }, [clientId, client]);

  const addNewBuilding = () => {
    setIsNew(true);
    setDisplayEditAndNew(true);
  };

  const editClientBuilding = (buildingInfo: Building) => {
    editBuilding(buildingInfo, clientId);
    setIsNew(false);
  };

  const deleteClientBuilding = (currentBuildingId: string) => {
    dispatch(deleteBuilding({ currentBuildingId, clientId }));
  };

  return (
    <List
      className="clients-list"
      dataSource={buildings}
      bordered
      renderItem={({ id, name, country, position }: Building) => (
        <List.Item
          key={id}
          actions={[
            <span
              className="edit-building icon"
              onClick={() =>
                editClientBuilding({ id, name, country, position })
              }
              key={`a-${id}`}
            >
              <EditOutlined />
            </span>,
            <span
              key={`a-${id}`}
              className="delete-building icon"
              onClick={(e) => {
                e.stopPropagation();
                deleteClientBuilding(id);
              }}
            >
              <DeleteOutlined />
            </span>,
          ]}
          className={id === selectedBuilding?.id ? 'selected' : ''}
          onClick={() =>
            changeSelectedBuilding({ id, name, country, position })
          }
        >
          <List.Item.Meta
            avatar={<HomeOutlined />}
            title={name}
            description={country}
          />
        </List.Item>
      )}
      header={<div>Building</div>}
      footer={
        <Button
          block
          type="link"
          className="add-building"
          onClick={addNewBuilding}
        >
          Add New Building
        </Button>
      }
    />
  );
}
