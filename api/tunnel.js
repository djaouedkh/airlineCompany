import localtunnel from 'localtunnel';
(async () => {
    const tunnel = await localtunnel({ port: 3000 });
    console.log(`ouverture du tunnel : ${tunnel.url}`);
    tunnel.on('close', () => { });
})();
