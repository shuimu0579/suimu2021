class Animal:
    kind = ''

    def __init__(self, name):
        self.name = name

    def voice(self):
        return '...'


a = Animal('hehehe')
#  等价于
# Animal -> tempobjectx
# x.__init__('hehehe')
# x.name = 'hehehe'
# a = x
print(a.name)

a.name = "123"
print(a.name)
print(a.voice())

print(Animal.kind)
Animal.kind = 'unknown'
print(Animal.kind)
print(a.kind)


class Dog(Animal):
    kind = 'canidae'

    def voice(self):
        return 'woof-woof'

    bark = voice


class Cat(Animal):
    kind = 'felidae'

    def voice(self):
        return 'meow-meow'

    mew = voice


c = Cat('Garfield')
d = Dog('Snoopy')

print(c.name)
print(d.name)
print(c.mew())
print(d.bark())

for animal in [a, c, d]:
    print(animal.name, ":", animal.voice())


class Husky(Dog):
    def __init__(self, name):
        super().__init__(name)
        self.habitat = 'Arcic'
        self.voice()

    def voice(self):
        return 'Ohooo'


h = Husky('雷猴啊')

print('---------------------')
print(h.kind)
print(h.habitat)
print(h.voice())
