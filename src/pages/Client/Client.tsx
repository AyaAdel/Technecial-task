import { useEffect, useState } from 'react';
import Map from 'components/Map/Map';
import BuildingsList from 'components/BuildingsList/BuildingsList';
import AddNewBuilding from 'components/AddNewBuilding/AddNewBuilding';
import type { Building } from 'types/Client';

import './Client.css';

export default function Client() {
  const [displayEditAndNew, setDisplayEditAndNew] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [editInfo, setEditInfo] = useState(
    {} as { buildingInfo: Building; clientId: string | undefined }
  );

  const RenderView = () => {
    if (displayEditAndNew) {
      return (
        <AddNewBuilding
          setDisplayEditAndNew={setDisplayEditAndNew}
          editInfo={editInfo}
          isNew={isNew}
        />
      );
    }

    return <Map />;
  };

  const displayBuildingInfo = (
    buildingInfo: Building,
    clientId: string | undefined
  ) => {
    setEditInfo({ buildingInfo, clientId });
    setDisplayEditAndNew(true);
  };

  // useEffect(() =>)

  useEffect(() => {
    if (isNew) {
      setEditInfo({} as any);
    }
  }, [isNew]);

  return (
    <div className="container">
      <BuildingsList
        setIsNew={setIsNew}
        editBuilding={displayBuildingInfo}
        setDisplayEditAndNew={setDisplayEditAndNew}
      />
      <RenderView />
    </div>
  );
}
