# take-home job application coding challenge

Using NO external libraries...

- load an index.html file on a Python web server using the command "start.sh"
- retrieve a JSON file containing dummy process & parent ids
- display the PID and PPID hierarchy in a table format, sorted by name
- children should be sorted on PID, and indented, with a leading ↳ character.

e.g.  this input...

~~~~
[
  { name: 'explorer.exe', pid: 1, ppid: 5 },
  { name: 'cmd.exe', pid: 2, ppid: 1 },
  { name: 'python.exe', pid: 3, ppid: 2 },
  { name: 'notepad.exe', pid: 4, ppid: 2 }
]
~~~~

should yield the following output...

~~~~
  Name               ID     Parent ID
  explorer.exe        1      5
  ↳ cmd.exe          2      1
    ↳ python.exe     3      2
    ↳ notepad.exe    4      2
~~~~



Notes:

- place files in a directory accessible on your system $PATH,
  or type "export PATH=$PATH:/somePath/someDirectory" to add it to your path,
  in order not to have to pre-pend "start.sh" with a "./" when running the script.
- type "chmod +x start.sh" at the terminal, to make the script executable
- click to "accept incoming network connections" when prompted



 
