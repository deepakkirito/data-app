const dataDb = require("../Model/api-model.js");
// const socket = req.app.get('socket-io');
let temp = 0;
dataDb.countDocuments().exec((err, totalDocuments) => {
    if (err) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
    temp = totalDocuments;
});

const sendData = (req, res) => {
    if (req.query.updateId) {
        dataDb.find({ _id: req.query.updateId }).exec((err, data) => {
            if (err) {
                return res.status(500).send({ error: "Internal Server Error" });
            }
            temp && res.status(200).send(data);
        })
    } else if (req.query.start) {
                dataDb.find({timeStamp: {$gt: req.query.start, $lt: req.query.end}}).exec((err, data) => {
                    if (err) {
                        return res.status(500).send({ error: "Internal Server Error" });
                    }
                    console.log(data);
                    temp && res.status(200).send(data);
                })
    } else {
        dataDb.find({}).skip(req.query.skip).limit(req.query.limit).exec((err, data) => {
            if (err) {
                return res.status(500).send({ error: "Internal Server Error" });
            }
            temp && res.status(200).send({ data: data, totalDocuments: temp });
        });
    }
}

const getData = (req, res) => {
    console.log(req.body);
    let data = new dataDb(req.body);
    data.save((err, data) => {
        if (err) {
            return res.status(500).send({ error: "Internal Server Error" });
        }
        res.status(201).send({ receivedData: data });
    });
}

const updateData = (req, res) => {
    dataDb.findByIdAndUpdate(req.query.updateId, req.body).exec((err, data) => {
        if (err) {
            return res.status(500).send({ error: "Internal Server Error" });
        }
        res.status(201).send("Data Updated");
    })
}

module.exports = {
    sendData,
    getData,
    updateData
}