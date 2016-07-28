(function (env) {
    "use strict";

    env.ddg_spice_randomuser = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result) {
            return Spice.failed('randomuser');
        }

        // Render the response
        Spice.add({
            id: 'randomuser',

            // Customize these properties
            name: 'RandomUser',
            data: api_result.results,
            meta: {
                sourceName: 'Randomuser',
                sourceUrl: 'http://randomuser.me'
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title: item.name.first + " " + item.name.last,
                    subtitle: item.email,
                    image: item.picture.medium,
                    record_data: item,
                    record_keys: [
                        'dob',
                        'phone',
                        'cell'
                    ]
                };
            },
            templates: {
                group: 'info',
                options: {
                    content: 'record',
                    moreAt: true
                }
            }
        });
    };
}(this));
