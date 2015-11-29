var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var StateSchema = new mongoose.Schema({
        state: String,
        link: String,
        contact_information: String,
        categories: [
            {
                category: String,
                laws: [
                    {
                        name: String,
                        description: [
                            {
                                detail: String
                            }
                        ]
                    }
                ]
            }
        ],
    },
    { collection: 'states' }
);

module.exports = mongoose.model('State', StateSchema);
