
const setupDB = async (req, res) => {
    return
    var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('./quinzical.txt');

    let categoryID = "";
    let newCategory = true;

    lr.on('line', async(line) => {
        lr.pause();
        if (newCategory) {
            console.log(line)
            const category = new Category({
                name: line
            })
            const { id } = await category.save()
            categoryID = id
            console.log(id)
            newCategory = false;
            lr.resume();
            return
        }
        if (line == "") {
            newCategory = true;
            lr.resume();
            return
        }
        let d = line.split('\\\\')
        console.log(categoryID)
        const question = new Question({
            question: d[0],
            qualifier: d[1],
            answer: d[2],
            category: categoryID
        })
        question.save()
        lr.resume();
    });
    res.send("done")
}