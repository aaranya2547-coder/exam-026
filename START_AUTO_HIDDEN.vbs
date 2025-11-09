' VBScript to run batch file hidden
Set WshShell = CreateObject("WScript.Shell")
WshShell.Run chr(34) & "C:\Users\Admin\exam-claude\START_AUTO.bat" & chr(34), 0
Set WshShell = Nothing
