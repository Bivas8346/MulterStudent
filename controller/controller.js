const student = require('../model/student');
const StudentModel = require('../model/student')


exports.home = ((req, res) => {
    StudentModel.find()
        .then(student => {
            console.log(student);
            res.render('home', { student })
        })
        .catch(error => {
            res.render('home', { Error: `Error Occured: ${student}` })
        })

})

exports.form = ((req, res) => {
    res.render('add_form', {
        title: "from"
    })
})


exports.edit = ((req, res) => {
    const pid = req.params.id;
    StudentModel.findById(pid)
        .then(student => {
            console.log(student);
            res.render('update', { student })
        }).catch(err => {
            res.render('update', { error: 'error ,Can not able fetch' })
        })
})


exports.update = ((req, res) => {
    const user_id = req.body.u_id;
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const city = req.body.city


    StudentModel.findById(user_id).then(result => {
        result.name = name
        result.email = email
        result.phone = phone
        result.city = city
        return result.save().then(result => {
            res.redirect('/');
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
})


exports.delete = ((req, res) => {
    const uid = req.params.id;
    StudentModel.deleteOne({ _id: uid }).then(del => {
        console.log(del, "delete successfully");
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    })

})

exports.create = ((req, res) => {
    console.log(req.body);
    const image = req.file;
    const student = new StudentModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        image: image.path,

    });
    student.save().then((result) => {
        req.session.message = {
            type: "success",
            message: "student added successfully",
        };
        res.redirect('/');
    }).catch((err) => {
        console.log(err, 'student not save');
        res.redirect('/add/student');
    })
})