from time import sleep
import random
from termcolor import colored
from simpleeval import simple_eval


class Bot:

    wait = 1

    def __init__(self):
        self.q = ''
        self.a = ''

    def _think(self, s):
        return s

    def _format(self, s):
        return colored(s, 'blue')

    def run(self):
        sleep(Bot.wait)
        print(self._format(self.q))
        self.a = input()
        sleep(Bot.wait)
        print(self._format(self._think(self.a)))


class HelloBot(Bot):
    def __init__(self):
        self.q = "Hi, what is your name?"

    def _think(self, s):
        return f"Hello {s}"


class GreetingBot(Bot):
    def __init__(self):
        self.q = "How are you today?"

    def _think(self, s):
        if 'good' in s.lower() or 'fine' in s.lower():
            return "I'm feeling good too"
        else:
            return "Sorry to hear that"


class FavoriteColorBot(Bot):
    def __init__(self):
        self.q = "What's your favorite color?"

    def _think(self, s):
        colors = [
            'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'
        ]
        return f"""You like {s.lower()}? My favorite color
            is {random.choice(colors)}"""


class CalcBot(Bot):
    def __init__(self):
        self.q = "Through recent upgrade I can do calculation now. Input some arithmetic expression to try:"

    def _think(self, s):
        result = simple_eval(s)
        return f"Done. Result = {result}"

    def run(self):
        sleep(Bot.wait)
        print(self._format(self.q))
        self.a = input()

        if (self.a == 'x' or self.a == 'q' or self.a == 'exit'
                or self.a == 'quit'):
            print('Bye, See you later!')
            return False
        else:
            sleep(Bot.wait)
            print(self._format(self._think(self.a)))
            self.run()


class BeautifulBot(Bot):
    def __init__(self):
        self.q = "Do you think I am beautiful?"

    def _think(self, s):
        if 'yes' in s.lower():
            self.q = "Woo, I am so sexy!"
            sleep(Bot.wait)
            print(self._format(self.q))
        else:
            self.q = """I don't want to hear this. Do you think I am beautiful?"""
            sleep(Bot.wait)
            print(self._format(self.q))
            self.a = input()
            self._think(self.a)
        return ''


class Garfield:
    def __init__(self, wait=1):
        Bot.wait = wait
        self.bots = []

    def add(self, bot):
        self.bots.append(bot)

    def _prompt(self, s):
        print(s)
        print()

    def run(self):
        self._prompt("This is Garfield dialog system. Let's talk.")
        for bot in self.bots:
            bot.run()


# 创建一个聊天延时 1s 的对话系统
garfield = Garfield(1)
# 向其中加入我们已经定义好的各个对话 bot 的对象实例
garfield.add(HelloBot())
garfield.add(GreetingBot())
garfield.add(FavoriteColorBot())
garfield.add(CalcBot())  # 四则运算计算器
garfield.add(BeautifulBot())
# 运行之
garfield.run()
