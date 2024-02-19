﻿using System;
using System.Collections.Generic;

namespace BitBracket.Models;

public partial class Announcement
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public DateTime CreationDate { get; set; }

    public string Description { get; set; } = null!;

    public bool IsActive { get; set; }

    public string Author { get; set; } = null!;
}
