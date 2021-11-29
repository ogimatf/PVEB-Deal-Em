# Project Dealem

2D card game

![image](https://user-images.githubusercontent.com/56790327/143858506-25f60802-2681-423e-a44d-302d90350f1f.png)

## Database

MongoDB running at localhost:27017.

## Build

Install required dependecies in the backend and frontend folders:

- Backend folder
```
npm init
npm i
npm mongodb
npm start
```


- Frontend folder
```
npm i
npm i socket.io-client
npm run build
npm start
```

You can also watch simple [tutorial video](https://youtu.be/OWAN1mZWLQY) on how to build project from scratch.

## Database schemas

**User:**

| Field | Type | Description |
| ------ | ------ | -------- |
| name | String | Unique username | 
| winNum | Int32 | Number of won games |
| loseNum |  Int32   | Number of lost games |
| points  | Int32 | Total points |

## Video
Video showing project's main features is on [link](https://www.youtube.com/watch?v=i41OfKKn2xA&ab_channel=v1rtuoso)

## Developers

- [Ognjen Stamenkovic, 64/2017](https://gitlab.com/ogimatf)
- [Predrag Mitic, 116/2017](https://gitlab.com/pm98)
- [Tomislav Savatijevic, 134/2017](https://gitlab.com/phalto)
- [Djordje Mutavdzic, 96/2017](https://gitlab.com/v1rtuoso)
