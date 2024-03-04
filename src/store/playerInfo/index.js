// store/playerInfo/index.js
import { defineStore } from 'pinia';
import createState from './state';
import createGetters from './getters';
import createActions from './actions';

export const usePlayerInfoStore = defineStore('playerInfo', {
  state: createState,
  getters: createGetters,
  actions: createActions,
});
