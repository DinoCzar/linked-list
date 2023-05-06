// Factory function to create a new node
function createNode(value) {
	return {
		value: value,
		next: null,
	};
}

// Factory function to create a new linked list
function createLinkedList() {
	return {
		head: null,
		tail: null,
		length: 0,

		// Add a new node to the beginning of the linked list
		prepend(value) {
			const node = createNode(value);

			if (this.head === null) {
				this.head = node;
				this.tail = node;
			} else {
				node.next = this.head;
				this.head = node;
			}

			this.length++;
		},

		// Add a new node to the end of the linked list
		append(value) {
			const node = createNode(value);

			if (this.tail === null) {
				this.head = node;
				this.tail = node;
			} else {
				this.tail.next = node;
				this.tail = node;
			}

			this.length++;
		},

		// Remove the first node from the linked list
		removeFirst() {
			if (this.head === null) {
				return null;
			}

			const value = this.head.value;
			this.head = this.head.next;
			this.length--;

			if (this.head === null) {
				this.tail = null;
			}

			return value;
		},

		// Remove the last node from the linked list
		removeLast() {
			if (this.tail === null) {
				return null;
			}

			let value = null;

			if (this.head === this.tail) {
				value = this.head.value;
				this.head = null;
				this.tail = null;
			} else {
				let current = this.head;
				while (current.next !== this.tail) {
					current = current.next;
				}

				value = this.tail.value;
				current.next = null;
				this.tail = current;
			}

			this.length--;
			return value;
		},

		// Convert the linked list to an array
		toArray() {
			const array = [];

			let current = this.head;
			while (current !== null) {
				array.push(current.value);
				current = current.next;
			}

			return array;
		},
	};
}

const list = createLinkedList();

// Return the first node in the list
function returnHead() {
	return list.head.value;
}

// Return the last node in the list
function returnTail() {
	return list.tail.value;
}

// Return the length of the list
function returnSize() {
	return list.length;
}

// Return the node at the given index
function nodeIndex(index) {
	return list.toArray()[index];
}

// Check if the value is in the list
function contains(value) {
	const listArray = list.toArray();
	return listArray.includes(value);
}

// Return the index of the node if the value is in the list
function find(value) {
	const listArray = list.toArray();
	let index = null;

	listArray.forEach((node, i) => {
		if (node === value) {
			index = i;
		}
	});

	return index;
}

// Returns linked list as a string
function toString() {
	const listArray = list.toArray();
	const formattedArray = listArray.map((value) => `( ${value} )`).join(' -> ');
	console.log(formattedArray);
}

// Insert a new node with the provided value at the given index.
function insertAt(value, index) {
	const node = createNode(value);

	if (index < 0 || index > list.length) {
		return null;
	}

	if (index === 0) {
		node.next = list.head;
		list.head = node;
		if (list.length === 0) {
			list.tail = node;
		}
	} else if (index === list.length) {
		list.tail.next = node;
		list.tail = node;
	} else {
		let current = list.head;
		for (let i = 0; i < index - 1; i++) {
			current = current.next;
		}
		node.next = current.next;
		current.next = node;
	}

	list.length++;
	return node;
}

// Remove the node at the given index
function removeAt(index) {
	if (index < 0 || index >= list.length) {
		return null; // or throw an error
	}

	let removedNode = null;

	if (index === 0) {
		removedNode = list.head;
		list.head = list.head.next;
		if (list.length === 1) {
			list.tail = null;
		}
	} else {
		let current = list.head;
		for (let i = 0; i < index - 1; i++) {
			current = current.next;
		}

		removedNode = current.next;
		current.next = current.next.next;

		if (index === list.length - 1) {
			list.tail = current;
		}
	}

	list.length--;
	return removedNode;
}

list.append(1);
list.append(2);
list.append(3);
list.prepend(0);
console.log(list.toArray()); // Output: [0, 1, 2, 3]
