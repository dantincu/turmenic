From [https://windowsreport.com/create-self-signed-certificate/](https://windowsreport.com/create-self-signed-certificate/)

# Create a ssl certificate using the `openssl` tool

To create a ssl public/private key pair using openssl, run the following commands:
<div style="color: orange">(OPTIONAL: overwritten by the following `ssh-keygen` command)</div>

```
openssl genrsa -out key.pem 4096
```

---

Run the following command to split the generated file into separate private and public key files:

```
ssh-keygen -t rsa -b 4096 -f key.pem
```

Once you have the public/private key generated, follow the next set of steps to create a self-signed certificate file on a Windows system.

## Create a self-signed certificate

```
openssl req -new -x509 -key key.pem -out cert.pem -days 1095
```
