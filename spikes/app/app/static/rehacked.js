(function () {
    var state = {
        features: []
    }

    var Attr = function (name, value) {
        return {
            stringify: function () {
                if (! value) return name;
                return name+'="'+value+'" ';
            }
        }
    }

    var Element = function (tag, attrs, children) {
        var childrenString = function () {
            if (typeof children === "string") return children;
            var s = '';
            for (var element in children) {
                s += element.stringify();
            }
            return s;
        }
        var attrString = function () {
            var s = '';
            for (var i = 0; i < attrs.length; i++) {
                s += attrs[i].stringify();
            }
            return s;
        }
        return {
            stringify: function() {
                if (tag === 'input') return '<'+tag+' '+attrString()+'>';
                return '<'+tag+' '+attrString()+'>'+childrenString()+'</'+tag+'>';
            }
        }
    }
       
    var render = function (vdom) {
        var s = '';
        for (var i = 0; i < vdom.length; i++) {
            s += vdom[i].stringify();
        }
        return s;
    }

    var update = function (vdom) {
        $('#ui').html(render(vdom));
    }

    var addFeatureButton = function () {
        return Element('a', [Attr('id', 'addFeatureButton'), Attr('class', 'btn btn-default'), Attr('href', '#')], 'New Feature');
    }

    var addFeatureForm = function () {
        return Element('form', [], [
            Element('div', [Attr('class', 'form-group')], [
                Element('label', [Attr('for', 'nameInput')], 'Name'),
                Element('input', [Attr('type', 'text'), Attr('class', 'form-control'), Attr('id', 'nameInput'), Attr('placeholder', 'Login')]),
            ]),
            Element('div', [Attr('class', 'form-group')], [
                Element('label', [Attr('for', 'descriptionInput')], 'Description'),
                Element('input', [Attr('type', 'text'), Attr('class', 'form-control'), Attr('id', 'descriptionInput'), Attr('placeholder', 'Users can login')])
            ]),
            Element('div', [Attr('class', 'form-group')], [
                Element('label', [Attr('for', 'valueStatementInput')], 'Value Statement'),
                Element('input', [Attr('type', 'text'), Attr('class', 'form-control'), Attr('id', 'valueStatementInput'), Attr('placeholder', 'Increase interaction with the application')])
            ]),
            Element('button', [Attr('id', 'submitFeatureButton'), Attr('class', 'btn btn-default')], 'Submit')
        ]);
    }

    var addFeature = function (name, description, valueStatement) {
        state.features.push({name: name, description: description, valueStatement: valueStatement});
    }

    var showFeatures = function () {
        if (state.features.length === 0) return Element('p', [], "No Features");
        return Element('ul', [], state.features.map(function (feature) {
            return Element('li', [], [
                Element('ul', [], [
                    Element('li', [], feature.name),
                    Element('li', [], feature.description),
                    Element('li', [], feature.valueStatement)
                ])
            ]);
        }));
    }

    $(document).ready(function () {
        $('#addFeatureButton').on('click', function () {
            update([addFeatureForm()]);
        })

        $('#submitFeatureButton').on('click', function () {
            addFeature($('#nameInput').attr('value'),
                       $('#descriptionInput').attr('value'),
                       $('#valueStatementInput').attr('value'));
            update([addFeatureButton(), showFeatures()]);
        })

        update([addFeatureButton(), showFeatures()]);
    });
}());
