Textum
==============
Web-app for working with handwritten texts.



### Requirements 

Django==1.5.1

### Submodules

# https://github.com/KopBob/WebODF
# https://github.com/KopBob/unoconv


### Befor server start

Run from root directory
	$ bower install

I. Update all submodules(host)

	$ git submodule init
	$ git submodule update

II. Install vagrant(host)
	
	http://www.vagrantup.com/downloads.html

Also install VirtualBox Guest Additions plugin:
	https://github.com/dotless-de/vagrant-vbguest

To start vagrant, run:
	$ vagrant up
	$ vagrant ssh


III. Ubuntu updates and installations(vagrant)

1.  Update Ubuntu.
	$ sudo apt-get update
	$ sudo apt-get dist-upgrade
Tip: Do not install GRUB-pc. 

	$ sudo apt-get install python-software-properties
	
2. Install LibreOffice

	$ sudo add-apt-repository ppa:libreoffice/libreoffice-4-1
	$ sudo apt-get update
	$ sudo apt-get install libreoffice

IV. Unoconv setup(vagrant)

STOPGAP:
Run unoconv listener:
	$ cd tmp
	$ sudo apt-get install git
	$ git clone https://github.com/dagwieers/unoconv
	$ ./unoconv/unoconv --listener &

V. Django setup(vagrant)

1. Install virtualenv
	$ sudo apt-get install python-pip
	$ sudo pip install virtualenv

2. Setup environment
	$ cd /vagrant
	$ ./.bin/buildenv.sh
	$ . ./.textumEnv/bin/activate

3. Run development server
	$ python manage.py runserver 0.0.0.0:8000
On host you can view project by http://127.0.0.1:8080/ url. 


