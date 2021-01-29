# coding=utf-8


class TreeNode:
    def __init__(self, name='root', data=None, parent=None, children=None):
        self.name = name
        self.data = data

        if parent:
            assert isinstance(parent, TreeNode)
            parent.add_child(self)
        self.parent = parent

        self.children = []
        if children:
            for child in children:
                self.add_child(child)

    def add_child(self, node):
        assert isinstance(node, TreeNode)
        node.parent = self
        self.children.append(node)

    def add_children(self, nodes):
        for node in nodes:
            assert isinstance(node, TreeNode)
            node.parent = self
            self.children.append(node)

    def remove(self, node):
        assert isinstance(node, TreeNode)
        node.parent = self
        self.children.remove(node)

    def move(self, node, new_parent):
        assert isinstance(node, TreeNode)
        assert isinstance(new_parent, TreeNode)
        node.parent = self
        self.children.remove(node)
        node.parent = new_parent
        new_parent.children.append(node)

    def find(self, name):

        pass

    def get_siblings(self, node):
        assert isinstance(node, TreeNode)
        node.parent = self
        arr = []
        for child in self.children:
            if (child.name != node.name):
                arr.append(child)
        print(f'{node.name}的兄弟节点是{arr}')

    def _childRecursive(self, children):
        arr = []
        for child in children:
            if (child.children):
                self._childRecursive(child.children)
            else:
                arr.append(child.name)

        return arr

    def _childRecursive01(self, children, node):
        count = 2
        children = []

        isCall = False

        for child in children:
            if (len(
                    list(
                        filter(lambda child: child.name == node.name,
                               children)))):
                count = count
                isCall = True
                break
            else:
                children.extend(child.children)
                isCall = False
        if (not isCall):
            count += 1
            self._childRecursive01(children, node)

        return count

    def get_descendants(self, node):
        assert isinstance(node, TreeNode)
        if node.children:
            arr = self._childRecursive(node.children)
            print(f"{node.name}节点的所有后代元素是{arr}")
        else:
            print(f'{node.name}节点没有后代元素')

    def get_tier(self, node):
        assert isinstance(node, TreeNode)
        if (node.name == self.name):
            print(f"{node.name}节点在第1层")
        else:
            if (self.children):
                count = self._childRecursive01(self.children, node)
                print(f"{node.name}节点在第{count}层")

    def _to_strings(self, xs, _prefix='', _last=True):
        """
        Generate a line string from the node, add it to list *xs*, 
        then recursively operate all children of the node.
        Parameters
        ----------
        xs : list
            A list of strings containing lines of the tree representation
        _prefix : str
            Prefix string of the node line, only used by self recursion
        _last : bool
            Boolean for whether the node is the last child, only used by self recursion
        """
        xs.append(''.join([_prefix, '└── ' if _last else '├── ', self.name]))
        _prefix += '    ' if _last else '│   '
        count = len(self.children)
        for n, node in enumerate(self.children):
            _last = n == (count - 1)
            node._to_strings(xs, _prefix, _last)

    def __repr__(self):
        return self.name

    def __str__(self):
        xs = [self.name]
        if self.children:
            for node in self.children[:-1]:
                node._to_strings(xs, _last=False)
            self.children[-1]._to_strings(xs, _last=True)
        return '\n'.join(xs)


if __name__ == '__main__':
    root = TreeNode()

    # replace following lines with your own testing data
    a = TreeNode(name='A', parent=root)
    a1 = TreeNode(name='A1', parent=a)
    a2 = TreeNode(name='A2', parent=a)
    a21 = TreeNode(name='A21', parent=a2)
    a22 = TreeNode(name='A22', parent=a2)
    b = TreeNode(name='B', parent=root)
    c = TreeNode(name='C', parent=root)
    c1 = TreeNode(name='C1')
    c2 = TreeNode(name='C2')
    c.add_child(c1)
    c.add_child(c2)
    c21 = TreeNode(name='C21', parent=c2)
    c22 = TreeNode(name='C22', parent=c2)

    # add test cases below for your functions
    c3 = TreeNode(name='C3')
    c4 = TreeNode(name='C4')
    # add_children
    c.add_children([c3, c4])
    # remove
    c.remove(c3)
    # move
    c.move(c4, c1)
    # find
    c.find('C22')
    # get_siblings
    c.get_siblings(c2)

    # get_descendants
    c.get_descendants(c2)

    # get_tier
    root.get_tier(c4)

    print(root)
