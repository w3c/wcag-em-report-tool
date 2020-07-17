The WCAG-EM Reporter was build with the idea in mind that other 
developers would have to extend the tool with components specific to their
work flow. The reporter was not intended to be the catch-all solution.

Because of this, features have been added that allow third party developers
to create plugins for wcag-em reporter.

# Decorators

The following directives can be extended:

- scAuditDirective
- scResult

These directives can be extended by creating additional link functions 
that are set during the config stage of the angular app. To add a plugin
Angular's `$provide.decorator()` method is used. Because we're manipulating
a directive, the term `Directive` must be added to the end of the name.
This works as follows:

    // Tell the app to run this config function, and use $provider
    angular.module('wcagReporter').config(function($provide) {
        // Decorate the scAudit directive
        $provide.decorator('scAuditDirective', function($delegate) {
            // The directive is the first item on the $deletate list
            var directive = $delegate[0];
            // Push an object
            directive.plugins.push({
                link: function (scope, elm, attr) {
                    console.log('Plugin is working');
                }
            });
            return $delegate;
       });
    });

Currently, the plugin structure is kept very basic. An array called 
`plugins` is on each directive that can be decorated. Any `link` function
on objects put on the array will be called (in order) during the link step.
Other properties of directives are not supported and will be added as the 
need for them arises.