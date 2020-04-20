import store from '@/store';

const sysPlugin = store => {    
    //called when the store is initialized
    store.subscribe((mutation, state) => {
        //called after every mutation.
        //The mutation comes in the format of `{ type, payload }`
        if(mutation.type === 'removeLoginToken') {
            //移除logintoken
            //store.dispatch('loginOut');
        }
    });
};

export default sysPlugin;