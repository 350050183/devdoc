const state = {
    url: '',
    menuIdx: 1,
};

const mutations = {
    setUrl(state, payload) {
        console.log('mutations:setUrl');
        console.log(payload);
        state.url = payload.url;
    },
};

const actions = {
    setUrlAsync({commit}, payload) {
        setTimeout(function(){
            //devtools显示不了这些log!!!只能显示mutation里的
            commit('setUrl', payload);
        },1000);
    },
    getUrls(){
        this.$http.get('http://devdocs.secret8.net/api/docs/index', []).then(function (response) {
            console.log('http get');
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    },
};

// const getters = {
//     getUrl: (state) => {
//         return state.url;
//     },
// };

export default {
    namespaced:true,
    state,
    mutations,
    actions,
};
