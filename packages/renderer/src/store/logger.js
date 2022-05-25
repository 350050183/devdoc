export default function logger() {
    return store => {
        store.subscribe(mutation => {
            //no effects
            console.log(mutation.type);
        });
    };
}
