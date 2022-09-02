export default (app, express, cookieParser, cors) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    // permet le transfert du cookie jwt
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', req.header('Origin'));
        res.header('Access-Control-Allow-Credentials', true);
        // res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    const corsOptions ={
        origin:'http://localhost:3001', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    }
    app.use(cors(corsOptions));
}