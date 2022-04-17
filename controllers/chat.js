const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversation");
exports.get_messages_patient=async (req,res)=>{
    /*  Function  to GEt all the messages of a conversation (Patient Side)
        Input: patientId (req.user._id)
        Output: all the messages of the conversation
        Steps:  1 - Finds the doctorId of the patient
                2 - Finds the conversationId involving the patient and doctor
                3 - If there is no conversation involving the patient and the doctor then a new conversation is created
                4 - Finds all the messages of the conversation
                5 - Sends the messages to the client
    */
    let patientId=req.user._id
    let doctorId=await findDoctorIdByPatientId(patientId)
    let conversationId=await findCoversationId(patientId,doctorId);
    findAndSendMessages(conversationId,res);
}
exports.get_messages_doctor = async (req, res) => {
    /*  Function  to GEt all the messages of a conversation (Doctor Side)
        Input: doctorId (req.user._id) and patientId (req.params.patientId)
        Output: all the messages of the conversation
        Steps:  1 - Finds the conversationId involving the patient and doctor
                2 - If there is no conversation involving the patient and the doctor then a new conversation is created
                3 - Finds all the messages of the conversation
                4 - Sends the messages to the client
    */
    let doctorId=req.user._id
    let patientId=req.params.patientId
    let conversationId=await findCoversationId(patientId,doctorId);
    findAndSendMessages(conversationId,res);
}
exports.post_messages = (req, res)=> {
    /*  Function  to Post a message to a conversation for both the patient and doctor
        Input: conversationId,message,senderId
        Output: message posted
        Steps:  1 - Creates a new message object
                2 - Saves the message
                3 - Sends the message to the client
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
exports.renderChatWindow_patient = (req, res) => {
    /*  Function  to Render the chat window for a patient*/
    res.render("chatWindow", {role: "patient",patientId:req.user._id,user:req.user});
}
exports.renderChatWindow_doctor = (req, res) => {
    /*  Function  to Render the chat window for a doctor*/
    res.render("chatWindow", {role: "doctor",patientId:req.params.patientId,user:req.user});
}
function findAndSendMessages(conversationId,res) {
    Message.find({conversationId:conversationId},(err,messages)=>{
        if(err)
            res.json({error:err,conversationId:conversationId});
        else if(!messages)
            res.json({error:"No messages found",conversationId:conversationId});
        else if(messages.length==0)
            res.json({error:"No messages found",conversationId:conversationId});
        else
            res.json({messages,conversationId});
    });
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