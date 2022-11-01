# micro-tickets

##To run this project you need:

- Docker + Kubernetes
- skaffold
- nginx
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.4.0/deploy/static/provider/cloud/deploy.yaml
```


### to create a JWT_KEY inside cluster:
```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=verysecretpinksocks
```

### to update common library and get the latest version
```
cd common && npm run pub
cd tickets && npm update @gunit/common --save
```
