to make it work:
go to root directory
skaffold dev
then in separate terminal run 
kubectl port-forward [NAME_OF_NATS_POD] 4222:4222


then cd nats-test
npm run listen
npm run publish
to restart script type rs
