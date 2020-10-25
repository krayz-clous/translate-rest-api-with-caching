# Translate Rest API with Smart Caching (nodejs, express,redis)

## Step1: Install dependencies
npm install

## Step1: Install Redis Server for your machine
Refer: https://redislabs.com/get-started-with-redis/

## Step3: Start the Server
npm start

## Step4: Request the translate API

#### GET API http://localhost:4041/translator/translate


```json
    // Request Query Params
    {   
        "phrase":"Paul Lobo, How are you?",
        "targetLanguage":"hi"
    }
```

```json
    // Response 
    {
        "status": "success",
        "ok": true,
        "code": 200,
        "message": "",
        "result": {
            "phrase": [
                "पॉल लोबो, आप कैसे हैं?"
            ]
        }
    }
```


