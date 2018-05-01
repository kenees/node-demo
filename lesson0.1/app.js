const Koa=require('koa');
const router = require('koa-router')();

const app=new Koa();

app.use(async (ctx,next)=>{
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
})

router.get('/hello/:name',async (ctx,next)=>{
    console.log('use1-1');
    var name = ctx.params.name;
    ctx.response.body =`<h1>Hello,${name}!</h1>`
    console.log('use1-2');
});

router.get("/", async (ctx,next) => {
    console.log('use2-1');
    ctx.response.body = `<h1>index</h1>`;
    console.log('use2-2');
})
router.post("/demo",async (ctx,next)=>{
    console.log(ctx.request.body.name);
})
app.use(router.routes());
app.listen(3000);
console.log(`app started at port 3000`);