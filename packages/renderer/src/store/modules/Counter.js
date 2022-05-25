const state = {
  main: 0,
};

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    console.log('mutation:DECREMENT_MAIN_COUNTER');
    state.main--;
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++;
  },
};

const actions = {
  someAsyncTask ({ commit }) {
    console.log('actions:someAsyncTask');
    // do something async
    commit('INCREMENT_MAIN_COUNTER');
  },
};

export default {
  state,
  mutations,
  actions,
};
