using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SpotifyStatusGrabber
{
	public partial class Form1 : Form
	{
		private NotifyIcon notifyIcon;

		public Form1()
		{
			InitializeComponent();

			// Minimize the main window.
			WindowState = FormWindowState.Minimized;

			// Initialize NotifyIcon
			notifyIcon = new NotifyIcon();
			notifyIcon.Icon = SystemIcons.Application; // Set an icon
			notifyIcon.Visible = true; // Make the icon visible

			// Optional: Add a context menu
			ContextMenuStrip contextMenu = new ContextMenuStrip();
			ToolStripMenuItem exitMenuItem = new ToolStripMenuItem("Exit");
			exitMenuItem.Click += ExitMenuItem_Click;
			contextMenu.Items.Add(exitMenuItem);
			notifyIcon.ContextMenuStrip = contextMenu;

			// Optional: Handle icon click event
			notifyIcon.MouseClick += NotifyIcon_MouseClick;

			// Hide the form from the taskbar
			ShowInTaskbar = false; // Make sure the form doesn't show in the taskbar
			Load += Form1_Load; // Handle the Load event
		}

		private void Form1_Load(object sender, EventArgs e)
		{
			// Hide the form from the taskbar
			ShowInTaskbar = false;
			FormBorderStyle = FormBorderStyle.None; // Optional: Remove border (not necessary for taskbar)
		}

		private void NotifyIcon_MouseClick(object sender, MouseEventArgs e)
		{
			if (e.Button == MouseButtons.Left)
			{
				MessageBox.Show("KYS!");
			}
		}

		private void ExitMenuItem_Click(object sender, EventArgs e)
		{
			Application.Exit(); // Exit the application
		}
	}
}
