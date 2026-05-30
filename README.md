
### Install

```bash
yarn install
yarn --cwd frontend install
```

### Run both apps

```bash
yarn dev
```

This starts:

- Backend: [http://localhost:3000](http://localhost:3000)
- Frontend: [http://localhost:5173](http://localhost:5173)

You can also run each app separately:

```bash
yarn dev:backend
yarn dev:frontend
```

### Quick verification

Open:

- [http://localhost:5173](http://localhost:5173)
- (This redirects directly to `/welcome/ff535484-6880-4653-b06e-89983ecf4ed5`)

Sample API check:

- [http://localhost:3000/comms/your-next-delivery/ff535484-6880-4653-b06e-89983ecf4ed5](http://localhost:3000/comms/your-next-delivery/ff535484-6880-4653-b06e-89983ecf4ed5)
