import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Subscription name is required'],
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    price: {
        type: Number,
        require: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater thab 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        require: true,
    },
    paymentMethod: {
        type: String,
        require: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        require: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date ',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // reference User model user's id
        ref: 'User',
        require: true,
        index: true
    }
}, {timestamps: true});

// Auto-calculate the renewal date if missing.
subscriptionSchema.pre('save', function(next){
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate); // making copy date of startDate 
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]); // based on the 
        // freq, it'll count the date and set the renewal date true
    }

    // Auto-update the status if renewal date passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next() // wothout using next, the document nevel will save to the DB 
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
