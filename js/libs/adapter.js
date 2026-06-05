const adapter = {
    canvas: null,
    frame: null,
    RequestAnimationFrame: (cb) => {
        if(adapter.frame == null) {
            adapter.frame = requestAnimationFrame(cb);
        }
    },
    CancelAnimationFrame: () => {
        cancelAnimationFrame(adapter.frame);
        adapter.frame = null;
    }
}

export default adapter;