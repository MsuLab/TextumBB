Textum
==============

1. INTRODUCTION
---------------

Web-app for working with handwritten texts.


2. REQUIREMENTS 
---------------

  Python packages:
    * Django==1.5.1
    * beautifulsoup4==4.3.2
    * pillow

  Submodules:
    * [WebODF](https://github.com/KopBob/WebODF)
    * [unoconv](https://github.com/KopBob/unoconv)


3. INSTALLATION
---------------
All cmds should be run from root directory of this project.

3.1 Vagrant
---------------
a. Install vagrant:
    http://www.vagrantup.com/downloads.html

And also install VirtualBox Guest Additions plugin:
    https://github.com/dotless-de/vagrant-vbguest

b. Start vagrant and ssh to it
    $ vagrant up
    $ vagrant ssh


3.2 Box updates
---------------
Execute all commands in Vagrant.

a. Update Ubuntu.
Do not install GRUB-pc. 
    $ sudo apt-get update
    $ sudo apt-get dist-upgrade

b. Install add-apt-repository
    $ sudo apt-get install python-software-properties
    
c. Install LibreOffice
    $ sudo add-apt-repository ppa:libreoffice/libreoffice-4-1
    $ sudo apt-get update
    $ sudo apt-get install libreoffice


3.3 Unoconv setup
---------------
Execute all commands in Vagrant.

a. Run unoconv listener
    $ cd tmp
    $ sudo apt-get install git
    $ git clone https://github.com/dagwieers/unoconv
    $ ./unoconv/unoconv --listener &


3.4 Bower install
---------------
Bower is a package manager for the web.

a. Get bower
    http://bower.io/

b. Install JavaScripts packages
    $ bower install


3.5 Django setup(vagrant)
---------------

a. Install virtualenv
    $ sudo apt-get install python-pip
    $ sudo pip install virtualenv

b. Setup environment
    $ cd /vagrant
    $ ./.bin/buildenv.sh
    $ . ./.textumEnv/bin/activate

c. Run development server
    $ python manage.py runserver 0.0.0.0:8000

On host you can view project by http://127.0.0.1:8080/ url. 


4. CONTACTS
-----------

You can ask any questions about usage Textum, report about bugs,
send your suggestions and patches in the Textum project's groups
and the developer's email.

Developer:
  * Boris Kopin     <kopbob@gmail.com>
  * Volodia Kozlov  <kozlov2.volodia2@gmail.com>