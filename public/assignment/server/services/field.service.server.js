

module.exports = function(app,model) {

    app.get('/api/form/:formid/field', getFieldsForForm);
    app.get('/api/form/:formid/field/:fieldid', getFieldForForm);
    app.delete('/api/form/:formid/field/:fieldid', deleteFieldFromForm);
    app.post('/api/form/:formid/field', createFieldForForm);
    app.put('/api/form/:formid/field/:fieldid', updateField);


    function getFieldsForForm(req, res) {
        var formId = req.params.formId;
        fields = model.getFieldsForForm(formId);
        res.json(fields);
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        field = model.getFieldForForm(formId, fieldId);
        res.json(field);
    }

    function deleteFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.deleteFieldFromForm(formId, fieldId);
    }

    function createFieldForForm(req, res) {
        var formId = req.params.userId;
        var newField = req.body;
        newField._id = (new Date()).getTime();
        field = model.createFieldForForm(formId, newField);
        res.json(field);
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        field = model.updateField(formId, fieldId, updatedField);
        res.json(field);
    }


}


