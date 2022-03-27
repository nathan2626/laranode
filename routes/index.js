const UserController = require('../app/Controllers/UserController.js')

module.exports = class routes {
    constructor(req, res) {
      this.req = req
      this.res = res


    if (this.req.url.match(/\/users\/([0-9]+)/) && this.req.method === 'GET') {
        console.log('test')
        const id = this.req.url.split("/")[2];
        const userController = new UserController(this.req, this.res);
        userController.get(id);
        this.res.writeHead(200, { "Content-type": "text/plain" })

    }  else if(this.req.url.match(/\/users\/([0-9]+)/) && this.req.method === 'PUT'){

      const userController = new UserController(this.req, this.res);
      const id = this.req.url.split("/")[2];
      const body = userController.getPostData(this.req)
      body.then(function(result) {
              const { name, email, password } = JSON.parse(result)
              userController.update(id,name, email, password)
          })
          this.res.writeHead(200, { "Content-type": "text/plain" })
          this.res.write('user mis à jour')
          this.res.end()
    
    } else if(this.req.url.match(/\/users\/([0-9]+)/) && this.req.method === 'DELETE'){
      const userController = new UserController(this.req, this.res);
      const id = this.req.url.split("/")[2];
      userController.delete(id)
      this.res.writeHead(204, { "Content-type": "text/plain" })
      this.res.write('user supprimé')
      this.res.end()
    }
    else {
      switch (this.req.method) {
        case "GET":
          switch (this.req.url) {
              case "/users":
                this.res.statusCode = 200
                this.res.setHeader("Content-Type", "application/json")
                const userController = new UserController(this.req, this.res);
                userController.getAll();
                break

              default:
              this.res.statusCode = 404
              this.res.write(`File not found (get): ${this.req.url}`)
              this.res.end()
            }

          break
    
        case "POST":
          switch (this.req.url) {
              case "/users":
                this.res.statusCode = 201
                this.res.writeHead(201, { "Content-type": "text/plain" })

                const userController = new UserController(this.req, this.res);
                const body = userController.getPostData(this.req)
                body.then(function(result) {
                    const { name, email, password } = JSON.parse(result)
                    userController.post(name,email, password)
                })
                break

              default:
                this.res.statusCode = 404
                this.res.write(`File not found (post) ${this.req.url}`)
                this.res.end()
            }
          break
    
        // case "PUT":
        //   switch (this.req.url) {
        //       default:
        //         this.res.statusCode = 404
        //         this.res.write(`File not found (put) ${this.req.url}`)
        //         this.res.end()
        //     }
        //   break
    
        // case "DELETE":
        //   switch (this.req.url) {
        //       default:
        //         this.res.statusCode = 404
        //         this.res.write(`File not found (delete) ${this.req.url}`)
        //         this.res.end()
        //     }
        //   break
    
        default:
            this.res.statusCode = 405
            this.res.write("Method not allowed")
            this.res.end()
      }

    }
}
}
