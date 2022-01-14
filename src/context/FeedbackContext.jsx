import { createContext, useState } from "react";
import { v4 as uuid4 } from 'uuid'

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is feedback item 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This is feedback item 2',
            rating: 9
        },
        {
            id: 3,
            text: 'This is feedback item 3',
            rating: 7
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    // Add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuid4();
        setFeedback([newFeedback, ...feedback]);
    }

    // Delete feedback
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            setFeedback(feedback.filter((item) => item.id !== id ))
        }
    }

    // Update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
        )
    }

    // Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    return <FeedbackContext.Provider value={{ 
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        feedbackEdit,
        
     }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;