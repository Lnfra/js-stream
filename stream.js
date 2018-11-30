const empty_stream = null;

const create_stream = (head, tail) => [head, tail];

const get_head = ([head, _]) => head;

const get_tail = ([_, tail]) => tail();

module.exports = {
	empty_stream, create_stream, get_head, get_tail
}
