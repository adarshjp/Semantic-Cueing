const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversation");

exports.get_messages = async (req, res) => {
    /*  Function  to GEt all the messages of a conversation (Patient Side)
        Input: patientId 
        Output: all the messages of the conversation
    */
   /*   Finds the doctorId of the patient
        Finds the conversation involving the patient and doctor
        If there is no conversation involving the patient and the doctor then a new conversation is created
        Finds all the messages of the conversation
        Sends the messages to the client 
   */
    let patientId=req.user._id;
    let doctorId=await findDoctorIdByPatientId(patientId);
    let conversationId=await findCoversationId(patientId,doctorId);
    Message.find({conversationId:conversationId},(err,messages)=>{
        if(err)
            res.json({error:err,conversationId:conversationId});
        else if(messages.length==0)
            res.json({error:"No messages found",conversationId:conversationId});
        else
            res.json({messages,conversationId});
    }); 
}
exports.post_messages = (req, res)=> {
    /*  Function  to Post a message to a conversation (Patient Side)
        Input: conversationId,message,senderId
        Output: message posted
    */
    const io = require('../index').io
    const newMessage = new Message({
        conversationId: req.body.conversationId,
        senderId: req.user._id,
        message: req.body.message,
        creationTime: Date.now(),
        isRead: false,
    });
    io.emit('message', newMessage)
    newMessage.save((err, message) => {
        if (err)
            res.json({ error: err });
        else
            res.json({success:"Message posted"});
    });
}
exports.renderChatWindow = (req, res) => {
    res.render('chatWindow')
}
function findDoctorIdByPatientId(patientId) {
    /* Function should return the  doctor id for a patient id that is passed as an argument
        Input: patientId
        Output: doctorId
    */
    return new Promise((resolve, reject) => {
        User.findById(patientId, (err, user) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(user.doctorid);
            }
        })
    })
    
}
function findCoversationId(patientId,doctorId)
{
    /* Function should return the  conversation id for a patient id and doctor id that is passed as an argument and if there is no conversation then create a new one
        Input: patientId,doctorId
        Output: conversationId
    */
    return new Promise((resolve, reject) => {
        Conversation.findOne({
            $or: [
                {
                    participants: [
                        patientId,
                        doctorId
                    ]
                },
                {
                    participants: [
                        doctorId,
                        patientId
                    ]
                }
            ]
        }, (err, conversation) => {
            if (err) {
                reject(err);
            }
            else {
                if (conversation) {
                    resolve(conversation._id);
                }
                else {
                    let newConversation = new Conversation({
                        participants: [
                            patientId,
                            doctorId
                        ]
                    })
                    newConversation.save((err, conversation) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(conversation._id);
                        }
                    })
                }
            }
        })
    })
}