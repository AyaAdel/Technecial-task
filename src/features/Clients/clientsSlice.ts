import { createSlice } from '@reduxjs/toolkit';
import clients from 'mocking/clients.json';
import type { Building, Client } from 'types/Client';

interface Clients {
  clients: Client[];
  selectedClient: null | Client;
  selectedBuilding: null | Building;
}

const initialState: Clients = {
  clients,
  selectedClient: null,
  selectedBuilding: null,
};

const getSelectedClientIndex = (clients: Client[], clientId: string) => {
  return clients.findIndex((client: Client) => client.id === Number(clientId));
};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addBuildingToClient(state, action) {
      const selectedClientIndex: number = getSelectedClientIndex(
        state.clients,
        action.payload.clientId
      );

      state.clients[selectedClientIndex].buildings.push(
        action.payload.buildingInfo
      );

      state.selectedClient = state.clients[selectedClientIndex];
    },
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload;
    },
    editBuildingInfo(state, action) {
      const selectedClientIndex: number = getSelectedClientIndex(
        state.clients,
        action.payload.clientId
      );

      const selectedBuildingsIndex = state.clients[
        selectedClientIndex
      ].buildings.findIndex(
        (building) => building.id === action.payload.currentBuildingId
      );

      state.clients[selectedClientIndex].buildings[selectedBuildingsIndex] =
        action.payload.buildingInfo;

      state.selectedClient!.buildings[selectedBuildingsIndex] =
        action.payload.buildingInfo;

      state.selectedBuilding = action.payload.buildingInfo;
    },
    setSelectedBuilding: (state, action) => {
      state.selectedBuilding = action.payload;
    },
    deleteBuilding: (state, action) => {
      const selectedClientIndex: number = getSelectedClientIndex(
        state.clients,
        action.payload.clientId
      );

      const selectedBuildingsIndex = state.clients[
        selectedClientIndex
      ].buildings.findIndex(
        (building) => building.id === action.payload.currentBuildingId
      );

      state.clients[selectedClientIndex].buildings.splice(
        selectedBuildingsIndex,
        1
      );

      state.selectedClient = state.clients[selectedClientIndex];

      state.selectedBuilding = state.selectedClient.buildings[0];
    },
  },
});

export const {
  addBuildingToClient,
  setSelectedClient,
  editBuildingInfo,
  setSelectedBuilding,
  deleteBuilding,
} = clientsSlice.actions;

export default clientsSlice.reducer;
